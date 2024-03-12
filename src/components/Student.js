import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {Container, Paper, Button} from '@mui/material'

export default function Student() {
    const paperStyle={padding:'50px 20px', width:600, margin:'20px auto'}
    const[name,setName]=useState('')
    const[nameError,setNameError]=useState('')
    const[address,setAddress]=useState('')
    const[addressError,setAddressError]=useState('')
    const[students,setStudents]=useState([])

    //validation

    const validate = () => {
        let isValid = true;
        if (!name.trim()) {
            setNameError('Name is required');
            isValid = false;
        } else {
            setNameError('');
        }
        if (!address.trim()) {
            setAddressError('Address is required');
            isValid = false;
        } else {
            setAddressError('');
        }
        return isValid;
    };


    //api call and POST data
    const handleClick=(e)=>{
        e.preventDefault();
        if(validate()){
            const student={name,address}
            console.log(student)
            fetch("http://localhost:8080/student/add",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(student)
            }).then(()=>{
                console.log("New Student Registered")
                //Clear form
                setName('')
                setAddress('')
            })
        }
    }

    //api call and Get data
    useEffect(() => {
        fetch("http://localhost:8080/student/getall")
          .then(res => res.json())
          .then(result => {
            setStudents(result);
          })
          .catch(error => {
            console.error('Error:', error);
          });
      }, []);
  return (
    <Container>
        <Paper elevation={3} style={paperStyle}>
            <h1 style={{color:"gray"}}>Add Student</h1>
            <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1 },
            }}
            noValidate
            autoComplete="off"
            >

            <TextField
            id="outlined-basic"
            label="Name" variant="outlined"
            fullWidth
            value={name}
            onChange={(e)=>setName(e.target.value)}
            error={!!nameError}
            helperText={nameError}/>

            <TextField
            id="outlined-basic"
            label="Address"
            variant="outlined"
            fullWidth
            value={address}
            onChange={(e)=>setAddress(e.target.value)}
            error={!!addressError}
            helperText={addressError}/>
            <Button variant="outlined" onClick={handleClick}>Submit</Button>
            </Box>
        </Paper>

        <h1>Student List</h1>
        <Paper elevation={3} style={paperStyle}>

            {students.map(student=>(
                <Paper elevation={6} style={{margin:'10px', padding:'15px', textAlign:'left'}} key={student.id}>
                    Id:{student.id} <br/>
                    Name: {student.name} <br/>
                    Address: {student.address}
                </Paper>
            ))}

        </Paper>
    </Container>
  );
}