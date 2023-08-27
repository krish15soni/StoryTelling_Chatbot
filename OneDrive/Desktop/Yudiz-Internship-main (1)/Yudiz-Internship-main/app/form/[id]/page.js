"use client"

import { useState } from "react";

const getFields = async (formId) => {
    try {
        const response = await fetch(`http://localhost:5000/form/${formId}`);
        const fields = await response.json();
        const data = fields[0];
        return data
    } catch (TypeError) {
        const data = undefined
        return data
    }
}

const page = async ({ params }) => {

    const field = await getFields(params.id)
    let formContent = field.content

    // Capitalize function 
    function titleCase(str) {
        var splitStr = str.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            // You do not need to check if i is larger than splitStr length, as your for does that for you
            // Assign it back to the array
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        // Directly return the joined string
        return splitStr.join(' ');
    }

    const submitForm = (e) => {
        e.preventDefault()

        // looping through our questions and getting the values based on the element name
        const formTargets = e.target
        let data = [];
        formContent.map((content) => {
            const element = (content.question_type)
            data.push({
                question: content.label,
                question_type: element,
                answer: formTargets[element].value
            })
        })
        console.log("Form data ", data);

    }

    if (!formContent) {
        return (
            <div className="flex items-center justify-center mt-5">
                Sorry Form not found
            </div>
        )
    }
    else {

        return (
            <div className='container mx-auto px-4 min-h-screen bg-blue-300 py-2'>
                <div className='flex flex-col w-full'>
                    <h2 className='w-full text-lg text-center'>{field.title}</h2>
                </div>
                <form onSubmit={submitForm} className='flex flex-col gap-2 mt-5'>
                    {
                        formContent.map((field, idx) => {
                            return (
                                <div key={idx} >
                                    <div className='flex justify-between items-center space-x-2'>
                                        <div key={field.name} className='block text-sm font-medium text-gray-700 rounded-lg'>
                                            <label className="p-3" htmlFor={field.question_type}>{titleCase(field.question_type)}</label>
                                        </div>

                                    </div>
                                    <div className='my-4'>
                                        {
                                            field.question_type == 'name' && <input name={field.question_type} type="text" className='p-3 rounded-md w-full block border border-gray-500 outline-none shadow-sm' placeholder={titleCase(field.question_type)}></input>
                                        }
                                        {
                                            field.question_type == 'mobile' && <input name={field.question_type} type="tel" className='p-3 rounded-md w-full block border border-gray-500 outline-none shadow-sm' placeholder={titleCase(field.question_type)}></input>
                                        }
                                        {
                                            field.question_type == 'address' && <input name={field.question_type} type="text" className='p-3 rounded-md w-full block border border-gray-500 outline-none shadow-sm' placeholder={titleCase(field.question_type)}></input>
                                        }
                                        {
                                            field.question_type == 'gender' && <input name={field.question_type} type="text" className='p-3 rounded-md w-full block border border-gray-500 outline-none shadow-sm' placeholder={titleCase(field.question_type)}></input>
                                        }
                                        {
                                            field.question_type == 'paragraph' && <textarea name={field.question_type} rows={4} type="text" className='p-3 rounded-md w-full block border border-gray-500 outline-none shadow-sm' placeholder={field.question_type}></textarea>
                                        }
                                        {
                                            field.question_type == 'multichoice' &&
                                            <select name={field.question_type} id="" className='p-3 rounded-md w-full block border border-gray-500 outline-none shadow-sm'>
                                                {field.list.map((item) => {
                                                    return <option key={item} value={item} >{item}</option>
                                                })}
                                            </select>
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                    <div className="flex items-center justify-center">
                        <button type="submit" className="px-3 py-2 bg-indigo-500 hover:bg-indigo-600 duration-200 rounded-lg">Submit</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default page