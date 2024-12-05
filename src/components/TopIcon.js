import { useEffect, useState } from 'react';
import top from '../resources/top_icon.png'

function TopIcon() {

    const [vis, setVis] = useState('arrow-hide')

    useEffect(() => {
        function handleScroll() {
            if (window.scrollY > 200) {
                setVis('arrow-show')
            } else {
                setVis('arrow-hide')
            }
        }
        window.addEventListener('scroll', handleScroll)

        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <div className="fixed-arrow">
            <button className="btn-up" type='button' onClick={() => '#'}>
                <a href="#top" className={vis}>
                    <img className="top-arrow" src={top} alt="To top of page"/>
                </a>
            </button>
        </div>
    )
}

export default TopIcon;