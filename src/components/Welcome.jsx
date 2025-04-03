import Button from './BaseComponents/Button';
import Section from './BaseComponents/Section';
export default function Welcome({transferPage}) {
    return <Section>
        <h1 className='text-5xl text-center underline mb-3'>Welcome Joseph!</h1>
        <Section classes='bg-stone-800 p-3 rounded-md shadow-md shadow-slate-700 m-1 mt-5 border border-stone-400' override>
            <p className='text-center'>This App is the first phase of a TTRPG (TableTop Roleplaying Game) Character Creator and Management App!</p>
            <p>As you are already aware, this app is built with REACT and styled using TailWind CSS.</p>
        </Section>
        <Section classes='bg-stone-800 p-3 rounded-md shadow-md shadow-slate-700 m-1 mt-5 border border-stone-400' override>
            <ul className='list-disc list-inside'>
                <li>
                    This application is consuming a .NET API that I built. It can be found 
                        <a className='text-amber-600 hover:text-orange-800 decoration-lime-800 underline' href = "https://github.com/watsonsz/GenesysCharacterManager">here</a>
                    
                </li>
                <li>
                    The GitHub link for THIS project is <a className='text-amber-600 hover:text-orange-800 decoration-lime-800 underline' href=""> here</a>
                </li>
            </ul>
            
        </Section>
        <Section classes='bg-stone-800 p-3 rounded-md shadow-md shadow-slate-700 m-1 mt-5 border border-stone-400' override>
            <p>Some of the Cool things I did: CSS Override</p>
            <p>I built several "Base" components like my <Button>Button</Button> component, as well as the section components you see wrapping this content</p>
            <Section>
                My Base Section component looks like this, with the orange shadow.
            </Section>
            <Section classes="border">
                I have added a "classes" prop to the base components, so that I can add additional classes to the component. This is how I added the border to this section.
            </Section>
            <p>Finally there is an "override" boolean, which completely cancels any of the base-CSS i have on my components, and allows me to rebuild-from-scratch the component's css, while still maintaining any state or other props. Thats why most of the sections on THIS page have a different shadow and border</p>
        </Section>
        <Button onClick = {transferPage} >Click Here to Begin</Button>
    </Section>
}