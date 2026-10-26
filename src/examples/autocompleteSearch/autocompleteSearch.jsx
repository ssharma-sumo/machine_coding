import React from 'react';
import { useDebounce } from '../../hooks/useDebounce';

import './autocompleteSearch.css'


const Autocomplete = (props) => { 
    const { items , isLoading, onItemSelect, onChange } = props;
    const inputRef = React.useRef();
    const [focus, setFocus] = React.useState(false);


    const canShow = React.useMemo(() => { 
        return focus;
    })


    const onChangeHandler = React.useCallback((e) => { 
        const value = e.target.value;
        
        if (onChange && onChange) { 
            onChange(value);
        }

    },[onChange])


    const onItemSelectHandler = React.useCallback((item) => { 
        if (item && onItemSelect) { 
            onItemSelect(item);
        }

        inputRef.current.value = item.name

    }, [items])


    const onFocusHandler = React.useCallback(() => { 
        setFocus(true);
    }, [])
    
    const onBlurHandler = React.useCallback(() => { 
        setTimeout(() => setFocus(false), 200);
    },[])

    return (
        <div className='autocompleteContainer'>
            <input
                name="inputField"
                placeholder='enter text'
                ref={inputRef}
                onChange={onChangeHandler}
                onFocus={onFocusHandler}
                onBlur={onBlurHandler}
                className='input'
            />
            {canShow && (
                <div className='item-list'>

                    {isLoading && items.length === 0 && (
                        <span>Loading list </span>
                    )}

                    {items.map(item => (
                        <div key={item.id }>
                            <span onClick={()=>onItemSelectHandler(item)}>{ item.name}</span>
                        </div>
                    )) }
                </div>
            ) }
        </div>
    )
}


const fetDataFromApi = (text , setList , setLoading) => { 
    const urlPath = `https://demo.dataverse.org/api/search?q=${text}`
    setLoading(true)



    fetch(urlPath).then(res => res.json()).then(response => { 
        const list = response.data.items.map(item => ({ name: item.name, id: item.global_id }));
        setList(list);
        setLoading(false);
    })
}


export const AutocompleteSearchDemo = () => {
    const [list, setList] = React.useState([]);
    const [isLoading, setLoading] = React.useState(false);

    const fetchDebounce = useDebounce(fetDataFromApi, 300);
    

    const onItemSelect = React.useCallback((item) => { 
        console.log(item)
    }, [])


    const onChangeHandler = React.useCallback((value) => {
        fetchDebounce(value, setList , setLoading)
     } , [])

    return (
        <Autocomplete
            items={list}
            isLoading={ isLoading}
            onChange={onChangeHandler}
            onItemSelect={onItemSelect}
        />
    )
 }