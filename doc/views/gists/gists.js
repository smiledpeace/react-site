import React, { useState, useCallback, useRef, useEffect } from "react";

import { useHistory } from "react-router-dom";
import '../../assets/styles/gists.less';
function MesusreExample(props) {
    const [rect, ref] = useClientReact();

    const history = useHistory(null);
    const h2Ref = useRef(null);

    console.log(history);

    const onButtonClick = () => {
        // `current` 指向已挂载到 DOM 上的文本输入元素
        console.log(h2Ref.current);

        h2Ref.current.style.background = '#f45';
    };

    const onRouterClick = (props) => {
        console.log(history);
        history.push('/movie')
    }

    return (
        <>
            <h1 ref={ref}>Hello, World</h1>
            {
                rect !== null && <h2 ref={h2Ref}>The above header is {Math.round(rect.height)}px tall</h2>
            }

            <button onClick={onButtonClick}>Button Click</button>

            <hr />
            <CountDown></CountDown>
            <hr/>
            <button onClick={onRouterClick}>onRouterClick</button>
        </>
    )
}

function useClientReact() {
    const [rect, setRect] = useState(null);

    const ref = useCallback(node => {
        if (node !== null) {
            setRect(node.getBoundingClientRect())
        }
    }, [])

    return [rect, ref];
}

const isSameSecond = (time1, time2) => {
    return Math.floor(time1 / 1000) === Math.floor(time2 / 1000);
  }
function CountDown() {
    const [remain, setRemain] = useState(0);
    const [rafId, setRafId] = useState(0);

    const mocTick = () => {
        const nowTime = Date.now();
        var id = requestAnimationFrame(() => {
            
            if (!isSameSecond(remain, nowTime)) {
                setRemain(nowTime);
            }
    
            mocTick();
            
        });
        setRafId(id);
        
        return () => cancelAnimationFrame(id);
    }

    // useEffect(() => {
    //     console.log(rafId);
        
    //     cancelAnimationFrame(rafId)
    //     mocTick();
    //     必须返回清除副作用的函数
    //     return () => cancelAnimationFrame(rafId);
    // }, [])
    
    const onPause = (e) => {

        console.log(e);

        cancelAnimationFrame(rafId)
        
    }
    const onPlay = (e) => {
        mocTick();
    }

    return (
        <>
            {/* 'objects-are-not-valid-as-a-react-child ' */}
            <span>{`${new Date(remain)}`}</span>



            <hr />
            <button  onClick={onPlay}>onPlay</button>
            <button  onClick={onPause}>pauseClick</button>
        </>
    )
}


export default MesusreExample;