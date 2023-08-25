"use client"
import { useState } from 'react'

export default function Home({ params }) {
  const [formContent, setFormContent] = useState([])
  const [onEdit, setOnEdit] = useState(false)
  const [textField, setTextField] = useState("")
  const [editedField, setEditedField] = useState("")

  const addQuestion = () => {
    const field = {
      "name": `question_${formContent.length}`,
      "label": "Untitled question",
      "question_type": "short_answer",
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
    const data = { id, form: formContent, link:link }
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
    <div className='container mx-auto px-4 min-h-screen bg-blue-300 py-2'>
      <div className='flex flex-col w-full'>
        <h2 className='text-lg'>Untitled Form</h2>
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
                        onEdit && (editedField === field.name) ? <input type='text' className='p-3 outline-none' value={field.label} onChange={(e) => editField(field.name, e.target.value)} onBlur={() => { setOnEdit(false); setEditedField("") }} /> :
                          <label onClick={() => { setOnEdit(true); setEditedField(field.name) }} className="p-3" htmlFor={field.label}>{field.label}</label>
                      }
                    </div>
                    <div>
                      <select name="" id="" onChange={((e) => editFieldType(field.name, e.target.value))} className='p-2 border border-gray-800 rounded-md'>
                        <option value="short_answer" >Short Answer</option>
                        <option value="paragraph">Paragraph</option>
                        <option value="multichoice">Multichoice</option>
                      </select>
                    </div>
                  </div>
                  <div className='my-4'>
                    {
                      field.question_type == 'short_answer' && <input type="text" className='p-3 rounded-md w-full block border border-gray-500 outline-none shadow-sm' placeholder="Short answer"></input>
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
        <div className='relative w-full p-5'>
          <div className='absolute inset-x-3 bottom-0 h-12 flex justify-center'>
            <button onClick={addQuestion} className='inline-flex bg-gray-800 hover:bg-gray-700 items-center p-3 text-sm text-white rounded-md'>Add Question</button>
          </div>
        </div>
      </div>
      <div className='flex flex-col w-full'>
        <h2 className='text-lg'>Form Preview</h2>
        <div className='bg-white shadow-lg rounded-md p-5 my-10'>
          <div className='flex flex-col gap-2'>
            {
              formContent.map((field) => {
                return (
                  <div key={field.name}>
                    <div className='flex justify-between items-center space-x-2'>
                      <div key={field.name} className='block text-sm font-medium text-gray-700 rounded-lg'>
                        <label className="p-3" htmlFor={field.label}>{field.label}</label>

                      </div>

                    </div>
                    <div className='my-4'>
                      {
                        field.question_type == 'short_answer' && <input type="text" className='p-3 rounded-md w-full block border border-gray-500 outline-none shadow-sm' placeholder="Short answer"></input>
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
