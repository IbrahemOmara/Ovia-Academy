import React from 'react'
import Select from 'react-select';

export default function SelectCountry({onChange,options,value}) {
    console.log(options);
    const defaultValue = (options,value)=>{
        return options ? options.find(option=> option.value === value) : '';
    }
    
  return (
    <>
      <div className="">
            <Select
                value={'kfkff'}
                onChange={value=>onChange={value}}
                options={options}
            />
      </div>
    </>
  )
}
