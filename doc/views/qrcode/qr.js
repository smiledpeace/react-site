import React, { useState, useCallback, useRef, useEffect } from "react";
import QRCode from 'qrcode';
import '../../assets/styles/qr';
function setQrcode(node, text) {
    QRCode.toCanvas(node, text, { margin: 1, width: 240, maskPattern: 1 }, function (error) {
        if (error) console.error(error)
        console.log('success!');
    })
}
function useClientReact() {
    const ref = useCallback(node => {
        if (node !== null) {
            setQrcode(node, '1234567');
        }
    }, [])

    return [ref];
}
const isSameSecond = (time1, time2) => {
    return Math.floor(time1 / 1000) === Math.floor(time2 / 1000);
}
function getRemain(endTime) {
    return Math.max(endTime - Date.now(), 0);
}
const QR = () => {
    const canvas = useRef(null);
    const [remain, setRemain] = useState(5000);
    let endTime = Date.now() + remain;
    let [rafId, setRafId] = useState(5000);
    let count = 0;
    useEffect(() => {
        setQrcode(canvas.current, '123');
        reloadQr();
        return () => cancelAnimationFrame(rafId);
    }, [])
    function reloadQr() {
        const id =  requestAnimationFrame(() => {
            const get_remain = getRemain(endTime);
            // console.log(isSameSecond(remain, get_remain));
            
            if (!isSameSecond(remain, get_remain) || get_remain === 0) {
                setRemain(get_remain);
                if (get_remain === 0) {
                    count++;
                    setQrcode(canvas.current, '1234567' + count);
                    cancelAnimationFrame(rafId);
                    setRemain(5000);
                    endTime = Date.now() + remain;
                    reloadQr();
                }
            }

            if (get_remain !== 0) {
                reloadQr();
            }
        })
        setRafId(id);
        return () => cancelAnimationFrame(id); 
    }
    const divStyle = {
        color: '#890'
    }
    return (
        <div className="qr">
            <div className="qr-remain" style={divStyle}>{remain}</div>
            <canvas ref={canvas}></canvas>
        </div>

    )
}

export default QR;