import { FaFacebookSquare } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import './Contact.css';
export default function Contact() {
    return (
        <div className="contact w-full bg-slate-800 text-white mb-5 flex h-14 justify-center items-center">
            <h3 className="">BE IN TOUCH WITH US:</h3>
            <div class="relative flex mx-14">
                <input
                    type="search"
                    class="relative m-0 -me-0.5 block flex-auto rounded-s border border-solid border-neutral-200 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-white outline-none transition duration-200 ease-in-out placeholder:text-white-500 focus:z-[3] focus:border-white focus:shadow-inset focus:outline-none motion-reduce:transition-none dark:border-white dark:text-white dark:placeholder:text-neutral-200 dark:autofill:shadow-autofill dark:focus:border-white"
                    placeholder="Search"
                    aria-label="Search"
                    id="exampleFormControlInput3"
                    aria-describedby="button-addon3" />
                <button
                    class="z-[2] inline-block rounded-e border-2 border-white px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:border-white-accent-300 hover:bg-white hover:text-black focus:border-white focus:bg-white focus:text-black focus:outline-none focus:ring-0 active:border-white active:text-white dark:text-black-500 dark:hover:bg-white "
                    data-twe-ripple-init
                    data-twe-ripple-color="white"
                    type="button"
                    id="button-addon3">
                    Search
                </button>
            </div>
            <div className="flex gap-2">
                <FaFacebookSquare />
                <FaGoogle />
                <FaGithub />
            </div>
        </div>
    )
}