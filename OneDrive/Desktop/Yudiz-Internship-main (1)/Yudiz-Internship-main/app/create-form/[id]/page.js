"use client"
import { useState } from 'react'

export default function Home({ params }) {
  const [title, setTitle] = useState("")
  const [formContent, setFormContent] = useState([])
  const [onEdit, setOnEdit] = useState(false)
  const [textField, setTextField] = useState("")
  const [editedField, setEditedField] = useState("")

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


  const addQuestion = () => {
    const field = {
      "name": `question_${formContent.length}`,
      "label": "Untitled question",
      "question_type": "name",
      "list": []
    }
    setFormContent([...formContent, field]);
  }

  const editField = (fieldName, fieldLabel) => {
    const formFields = [...formContent]
    const fieldIndex = formFields.findIndex(f => f.name === fieldName)
    if (fieldIndex > -1) {
      formFields[fieldIndex].label = fieldLabel
      setFormContent(formFields)
    }
  }

  const editFieldType = (fieldName, fieldLabel) => {
    const formFields = [...formContent]
    const fieldIndex = formFields.findIndex(f => f.name === fieldName)
    if (fieldIndex > -1) {
      formFields[fieldIndex].question_type = fieldLabel
      setFormContent(formFields)
    }
  }

  const addFieldOption = (fieldName, option) => {
    const formFields = [...formContent]
    const fieldIndex = formFields.findIndex(f => f.name === fieldName)
    if (fieldIndex > -1) {
      if (option && option !== "") {
        formFields[fieldIndex].list.push(option)
        setFormContent(formFields)
        setTextField("")
      }
    }
  }

  const createForm = async () => {
    const id = params.id
    const link = `http://localhost:5000/form/${id}`
    const data = { id, title, form: formContent, link: link }
    console.log(data);
    const response = await fetch('http://localhost:5000/create-form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    const res = await response.json()
    console.log(res);
    alert("Form Created")
  }

  return (
    <>
      <nav className="flex mx-auto bg-slate-200 shadow-sm ">
        <div className="">
                Preview
                
        </div>
        
        <div className="dropdown inline-block p-4 cursor-pointer max-[650px]:hidden ">
          <div className="line h-0.5 w-6 my-1 bg-black"></div>
          <div className="line h-0.5 w-6 my-1 bg-black"></div>
          <div className="line h-0.5 w-6 my-1 bg-black"></div>
          </div>
        <div className="">
          Styles
        </div>      
        </nav>
      <div className='mt-5 max-w-[780px] mx-auto min-h-screen bg border-t-4 rounded-lg border-gray-700 py-2'>
        <div className='flex flex-col w-full '>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} name="title" id='title' placeholder='Untitled Form...' className='placeholder-gray-700 py-2 px-3 text-xl bg-transparent outline-none text-black' required />
        </div>
        <div className='bg-white shadow-lg rounded-md p-5 my-10'>
          <div className='flex flex-col gap-2'>
            {
              formContent.map((field, idx) => {
                return (
                  <div key={idx}>
                    <div className='flex justify-between items-center space-x-2'>
                      <div key={field.name} className='block text-sm font-medium text-gray-700 border border-gray-400 rounded-lg p-3'>
                        {
                          (field.question_type === "other" || field.question_type === "multichoice") ?
                            (onEdit && (editedField === field.name) ? <input type='text' className='p-3 outline-none' value={field.label} onChange={(e) => editField(field.name, e.target.value)} onBlur={() => { setOnEdit(false); setEditedField("") }} /> :
                              <label onClick={() => { setOnEdit(true); setEditedField(field.name) }} className="p-3 " htmlFor={field.label}>{field.label}</label>
                            )
                            :
                            (<label className="p-3" htmlFor={field.question_type}>{titleCase(field.question_type)}</label>)
                        }
                      </div>
                      <div>
                        <select name="" id="" onChange={((e) => editFieldType(field.name, e.target.value))} className='p-2 border border-gray-800 rounded-md'>
                          <option value="name" >Name</option>
                          <option value="mobile">Mobile</option>
                          <option value="address">Address</option>
                          <option value="gender">Gender</option>
                          <option value="multichoice">Multichoice</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                    <div className='my-4'>
                      {
                        field.question_type == 'name' && <input type="text" className='p-3 rounded-md w-full block border border-gray-500 outline-none shadow-sm' placeholder={titleCase(field.question_type)}></input>
                      }
                      {
                        field.question_type == 'mobile' && <input type="tel" className='p-3 rounded-md w-full block border border-gray-500 outline-none shadow-sm' placeholder={titleCase(field.question_type)}></input>
                      }
                      {
                        field.question_type == 'address' && <input type="text" className='p-3 rounded-md w-full block border border-gray-500 outline-none shadow-sm' placeholder={titleCase(field.question_type)}></input>
                      }
                      {
                        field.question_type == 'gender' && <input type="text" className='p-3 rounded-md w-full block border border-gray-500 outline-none shadow-sm' placeholder={titleCase(field.question_type)}></input>
                      }
                      {
                        field.question_type == 'other' && <input type="text" className='p-3 rounded-md w-full block border border-gray-500 outline-none shadow-sm' placeholder={titleCase(field.question_type)}></input>
                      }
                      {
                        field.question_type == 'paragraph' && <textarea rows={4} type="text" className='p-3 rounded-md w-full block border border-gray-500 outline-none shadow-sm' placeholder={field.label}></textarea>
                      }
                      {
                        field.question_type == 'multichoice' &&
                        <div className='my-4 flex flex-col space-y-2'>
                          <select name="" id="" className='p-3 rounded-md w-full block border border-gray-500 outline-none shadow-sm'>
                            {field.list.map((item) => {
                              return <option key={item} value={item} >{item}</option>
                            })}
                          </select>
                          <div className='flex gap-3'>
                            <input type="text" onChange={(e) => setTextField(e.target.value)} value={textField} placeholder='Add an option' className='px-4 py-2 outline-none border rounded-lg' />
                            <button className='bg-indigo-500 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg' onClick={() => addFieldOption(field.name, textField)}>Add</button>
                          </div>
                        </div>
                      }
                    </div>

                  </div>
                )
              })
            }

          </div>
          <div className='relative w-full p-5 mt-2'>
            <div className='absolute inset-x-3 bottom-0 h-12 flex justify-center'>
              <button onClick={addQuestion} className='inline-flex bg-gray-800 hover:bg-gray-700 duration-300 items-center p-3 text-sm text-white rounded-md'>Add Question</button>
            </div>
          </div>
        </div>
        <h2 className='text-lg my-4 text-center'>Form Preview</h2>
        <div className='flex flex-col border-t-4 rounded-lg border-gray-700 px-4 py-2'>
          <h2 className='text-lg mt-5'>{title}</h2>
          <div className='bg-white shadow-lg rounded-md px-5 py-2 my-10'>
            <div className='flex flex-col gap-2'>
              {
                formContent.map((field) => {
                  return (
                    <div key={field.name}>
                      <div className='flex justify-between items-center space-x-2'>
                        <div key={field.name} className='block text-sm font-medium text-gray-700 rounded-lg'>
                          {
                            (field.question_type === "other" || field.question_type === "multichoice") ?
                              <label onClick={() => { setOnEdit(true); setEditedField(field.name) }} className="p-3 " htmlFor={field.label}>{field.label}</label>

                              :
                              <label className="p-3" htmlFor={field.question_type}>{titleCase(field.question_type)}</label>

                          }
                        </div>

                      </div>
                      <div className='my-4'>
                        {
                          field.question_type == 'name' && <input type="text" className='p-3 rounded-md w-full block border border-gray-500 outline-none shadow-sm' placeholder={titleCase(field.question_type)}></input>
                        }
                        {
                          field.question_type == 'mobile' && <input type="tel" className='p-3 rounded-md w-full block border border-gray-500 outline-none shadow-sm' placeholder={titleCase(field.question_type)}></input>
                        }
                        {
                          field.question_type == 'address' && <input type="text" className='p-3 rounded-md w-full block border border-gray-500 outline-none shadow-sm' placeholder={titleCase(field.question_type)}></input>
                        }
                        {
                          field.question_type == 'gender' && <input type="text" className='p-3 rounded-md w-full block border border-gray-500 outline-none shadow-sm' placeholder={titleCase(field.question_type)}></input>
                        }
                        {
                          field.question_type == 'other' && <input type="text" className='p-3 rounded-md w-full block border border-gray-500 outline-none shadow-sm' placeholder={titleCase(field.label)}></input>
                        }
                        {
                          field.question_type == 'paragraph' && <textarea rows={4} type="text" className='p-3 rounded-md w-full block border border-gray-500 outline-none shadow-sm' placeholder={field.label}></textarea>
                        }
                        {
                          field.question_type == 'multichoice' &&
                          <select name="" id="" className='p-3 rounded-md w-full block border border-gray-500 outline-none shadow-sm'>
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
            </div>
          </div>
        </div>
        <div className='mb-10 h-12 flex justify-center'>
          <button onClick={createForm} className='inline-flex bg-gray-800 hover:bg-gray-700 items-center p-3 text-sm text-white rounded-md'>Create Form</button>
        </div>
      </div>
    </>
  )
}
