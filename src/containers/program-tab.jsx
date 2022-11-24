import React,{useState} from 'react';

function ProgramTab() {
    const [textAreaValue,setTextAreaValue] = useState('');
    console.log(textAreaValue);
    return (
        <div>
            {/* <h2>welcome home</h2> */}
        
            <textarea
                id="codetext"
                style={{borderRadius:"5px",marginTop:'10px',marginLeft:"5px",background: "#d0e2bc"}}
                value={textAreaValue}
                onChange={(e) => setTextAreaValue(e.target.value)}
                rows={30}
                cols={95}
                />
        </div>
    );
}

export default ProgramTab;