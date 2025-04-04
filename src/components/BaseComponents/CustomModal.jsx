import React from 'react';
import { useImperativeHandle, useRef } from 'react';
import Button from './Button';
export default function CustomModal({opened, ref, children}){
        const modalRef = useRef();
    
        useImperativeHandle(ref, () => ({
            open: () => {
                console.log("Opening modal");
                modalRef.current.showModal();
            },
            close: () => {
                modalRef.current.close();
            },
        }));
        {if (opened) {
            return (
                <dialog open ref={modalRef} className="text-stone-300 bg-stone-800 p-3 rounded-md shadow-md shadow-slate-500 m-1 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-3/4 p-0">
                    {children}
                        <Button onClick={() => modalRef.current.close()} >Close</Button>
                    </dialog>
                
            );
        }
        else {
            return (
                <dialog ref={modalRef} className={`text-stone-300 bg-stone-800 p-3 rounded-md shadow-md shadow-slate-500 m-1 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-3/4 p-0`}>
                    {children}
                        <Button onClick={() => modalRef.current.close()} >Close</Button>
                    </dialog>
                );
            }
    }
        
}