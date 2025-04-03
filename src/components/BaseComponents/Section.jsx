import React from 'react';
export default function Section({children, classes, override, ...props}) {
    const defaultClasses = 'bg-stone-800 p-3 rounded-md shadow-md shadow-orange-800 m-1 mt-5';
    const appliedClasses = override ? classes : `${defaultClasses} ${classes}`;
    return (
        <section className={appliedClasses} {...props}>
            {children}
        </section>
    )
}