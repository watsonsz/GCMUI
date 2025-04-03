export default function Button({children, classes = "", selected, override, ...props}) {
    const backgroundColor = selected ? "bg-amber-600" : "bg-orange-800";
    const defaultClasses = `${backgroundColor} hover:bg-amber-600 mx-2 min-w-20 rounded-md `;
    const appliedClasses = override ? classes :`${defaultClasses} ${classes}`;
    return (
        <button className={appliedClasses} {...props}>
            {children}
        </button>
    )
}