"use client"

const getFields = async () => {
    const response = await fetch("http://localhost:5000/form/2ce74068-dfe1-2cf3-30c5-6bb6216c051e");
    const fields = await response.json();
    const data = fields[0].content;
    return data
}


const page = async () => {
    const field = await getFields()
    let formContent = field

    const submitForm = (e) => {
        e.preventDefault()

        // looping through our questions and getting the values 
        const formTargets = e.target
        let data = [];
        formContent.map((content) => {
            const element = (content.label)
            data.push({
                question: content.label,
                answer: formTargets[element].value
            })
        })
        console.log("Form data ", data);
    }

    if (!formContent) return <div>Loading...</div>
    else {

        return (
            <div className='container mx-auto px-4 min-h-screen bg-blue-300 py-2'>
                <div className='flex flex-col w-full'>
                    <h2 className='w-full text-lg text-center'>Untitled Form</h2>
                </div>
                <form onSubmit={submitForm} className='flex flex-col gap-2 mt-5'>
                    {
                        formContent.map((field, idx) => {
                            return (
                                <div key={idx} >
                                    <div className='flex justify-between items-center space-x-2'>
                                        <div key={field.name} className='block text-sm font-medium text-gray-700 rounded-lg'>
                                            <label className="p-3" htmlFor={field.label}>{field.label}</label>

                                        </div>

                                    </div>
                                    <div className='my-4'>
                                        {
                                            field.question_type == 'short_answer' && <input name={field.label} type="text" className='p-3 rounded-md w-full block border border-gray-500 outline-none shadow-sm' placeholder="Short answer"></input>
                                        }
                                        {
                                            field.question_type == 'paragraph' && <textarea name={field.label} rows={4} type="text" className='p-3 rounded-md w-full block border border-gray-500 outline-none shadow-sm' placeholder={field.label}></textarea>
                                        }
                                        {
                                            field.question_type == 'multichoice' &&
                                            <select name={field.label} id="" className='p-3 rounded-md w-full block border border-gray-500 outline-none shadow-sm'>
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