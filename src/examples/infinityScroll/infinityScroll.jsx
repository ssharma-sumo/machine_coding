import React from 'react';

export const InfinityScroll = () => { 
    const [count, setCount] = React.useState(50);

    React.useEffect(() => {
        const sentinel = document.getElementById('sentinel');

        const callback = (entries) => {
            if (entries[0].isIntersecting) {
                setCount((prevCount) => prevCount + 50);
            }
        };

        const observer = new IntersectionObserver(callback, {
            root: null,
            rootMargin: '0px',
            threshold: 1.0
        });

        if (sentinel) {
            observer.observe(sentinel);
        }

        return () => {
            if (sentinel) {
                observer.unobserve(sentinel);
            }
        };
    }, []);

    const listItems = React.useMemo(() => {
        return Array.from({ length: count }, (_, index) => (
            <div key={index} className="item">
                Item {index + 1}
            </div>
        ));
    }, [count]);

    return (
        <div className="infinity-scroll-container">
            {listItems}
            <div id="sentinel"></div>
        </div>
    )
}