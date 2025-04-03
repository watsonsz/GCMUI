export default function FormInput({textarea, label, labelFor, ...props}) {
    const input = textarea ? <textarea className="flex-1 mx-2 p-2 border border-stone-700" {...props}></textarea> : 
                             <input className="flex-1 mx-2 p-2 border border-stone-700 h-10" {...props}/>
    return (
        <div className="flex sm:flex-row justify-between m-2 w-full">
            <label className="mx-2 p-2" htmlFor={labelFor}>{label}</label>
            {input}
        </div>
    )
}