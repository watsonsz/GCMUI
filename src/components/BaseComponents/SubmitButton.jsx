export default function SubmitButton({children,classes = "", ...props}){
    const defaultClasses = "bg-lime-800 hover:bg-lime-500 hover:text-stone-700 mx-2 w-20 rounded-md";
    const appliedClasses = defaultClasses + classes;
    return (
        <button className={appliedClasses} {...props}>
            {children}
        </button>
    )
}