import { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col} from 'react-bootstrap';
import Transaction from './Transaction';

const Expenses = () => {
  const [transactions, setTransactions] = useState([]);
  const [text, setText] = useState("");
  const [amount, setAmount] = useState(1);
  const [toEdit, setToEdit] = useState(null);

  useEffect(()=> {
    // localStorage.setItem("transactions", "[]")
    const list = JSON.parse(localStorage.getItem("transactions")) || [];
    if(list.length>0) setTransactions(list);
  }, []);

  
  

  const totalTransactions = JSON.parse(localStorage.getItem("transactions"))?.reduce(
    (acc, curr) => acc + curr.amount * 1,
   0);

   const totalExpenses = JSON.parse(localStorage.getItem("transactions"))?.filter((item) => item.type == 'Expense')
   ?.reduce((acc, curr) => acc + curr.amount *1, 
   0);

   const totalIncome = JSON.parse(localStorage.getItem("transactions"))?.filter((item) => item.type == 'Income')
   ?.reduce((acc, curr) => acc + curr.amount *1, 
   0);

  

  const addTransaction = () => {
    if(amount === 0 || !text) return alert('Enter all fields');
    
    if(toEdit) {
      const updatedTransactions = transactions?.map((item) => {
        
        if(item.id === toEdit.id) 
        return {
        
          id: item.id, 
          text, 
          amount,
          type: amount < 0 ? 'Expense' : 'Income',
        };
        return item
      });
      
      setTransactions(updatedTransactions);
      localStorage.setItem("transactions", JSON.stringify(updatedTransactions));

      setAmount(1);
      setText('');
      setToEdit();
      return;
    }
     
    const transaction = {
        id: Date.now(),
        text,
        amount:(amount*1).toFixed(2),
        type: amount < 0 ? 'Expense' : 'Income',
      };

      console.log(transaction.amount)

     const list = [...transactions, transaction]
      //  setTransactions((prev) => {
      //   return [...prev, transaction];
      // });
      setTransactions(list)
      localStorage.setItem("transactions", JSON.stringify([...transactions, transaction]));
      

      setText('');
      setAmount(1);

      console.log(transaction)

    
      
  
  }
  function deleteTransaction(id) {
    const filteredTransactions = transactions?.filter(
      (transaction) => transaction.id !== id
    );

    setTransactions(filteredTransactions);
    localStorage.setItem("transactions", JSON.stringify(filteredTransactions))
  }

  function editTransaction(transaction) {
    setAmount(transaction.amount);
    setText(transaction.text);
    setToEdit(transaction);
  }



  return (
    <>
    
    <Container fluid style={{ margin:"auto", height:"100%"}}>
      <h1>EXPENSE TRACKER</h1>
      <Row> 
      <Col xs={12} sm={8} md={12}>
        <div className='inputs'>
        <label htmlFor='text'>Description</label>
        <br/>
        <input 
          onChange={(e)=>setText(e.target.value)}
          value={text}
          type='text'
          id='text'
          placeholder='Enter Description'
        />
        <div>
          <label htmlFor='amount'>
            Amount<span style={{fontStyle:'italic'}}> (-) sign for Expense and (+) sign for Income</span>{" "}
          </label>
          <div><input 
           onChange={(e)=>setAmount(e.target.value)}
           value={amount}
           type='number'
            id='amount'
          placeholder='Enter Amount'
          /></div>
          
        </div>
        <button onClick={addTransaction}>Add Transaction</button>
      </div >
      </Col> 
       
     <Col xs={12} sm={6} md={7}>
     <div 
      style={{ marginTop: '45px'}}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            paddingLeft: '10px',
          }}
        >
          <h4 >History</h4>{" "}
          <h4 >Balance: ${totalTransactions?.toFixed(2)}</h4>
        </div>

        {transactions?.length ? (
        transactions?.map((transaction,) => 
           (
            <div key={transaction.id}>
            <Transaction transaction={transaction} deleteTransaction={deleteTransaction} editTransaction={editTransaction} />
            </div>
          )
        )
      ) : (
        <h5>No transaction added</h5>
      )}
      </div> 
     </Col>
     
      
        <Col style={{ boxSizing:'border-box', marginTop:'37px', }} xs={12} sm={6} md={4} >
        <h4 style={{ textAlign:'center', borderTop: '30px solid green', marginTop:'45px'}}>Total Income: ${totalIncome}</h4>{""}
        <h4 style={{ textAlign:'center', borderTop: '30px solid red', marginTop:'45px'}}>Total Expenses: ${totalExpenses *-1}</h4>{""}
        </Col>
      </Row>
      
        
      
     

       
        </Container>
    </ >
)
}

export default Expenses




