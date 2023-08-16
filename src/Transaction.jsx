/* eslint-disable react/prop-types */


const Transaction = (props) => {
    const { transaction, deleteTransaction, editTransaction} = props;
  return (
    <div 
        
      style={{
        display:'flex',
        alignItems:'center',
        justifyContent:'space-between',
        background:'#D3D3D3',
        padding:'5px 10px',
        margin:'auto',
        marginBottom:'5px',
        borderLeft: `5px solid ${
          transaction.type == 'Expense' ? 'red' : 'green'
        }`,
      }}
    >
      <p style={{marginTop:'10px', paddingTop:'10px'}}>
        <button 
        onClick={()=>editTransaction(transaction)}
          style={{
            paddingLeft:'0px',
            paddingBottom:'20px',
            width:'40px',
            height: '10px',
            fontSize:'small',
            outlineStyle:'outset',
            outlineColor:'blue',
            borderRadius:'5px',
            outlineWidth:'thin',
        }}
        >Edit
        </button>{' '}
       <span className='details'>{transaction.text}</span> 
      </p>
      <p style={{ marginTop:'10px', paddingTop:'10px'}}><span className='details'>${transaction.amount}{' '}</span>
        
        <span
          style={{
            color:'red',
            marginLeft:'25px',
            cursor:'pointer',   
         }}
  
         onClick={()=>deleteTransaction(transaction.id)}
        >
          X
        </span>
      </p>
    </div>
  )
  }
  
  export default Transaction