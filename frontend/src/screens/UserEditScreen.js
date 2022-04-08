import React,{ useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button,Form } from 'react-bootstrap';
import { useDispatch,useSelector } from 'react-redux'
import Loader from '../components/Loader';
import Message from '../components/Message';
import { getUserDetails,updateUser } from '../actions/userActions'; 
import FormContainer from '../components/FormContainer';
import {USER_UPDATE_RESET} from '../constants/userConstants';

const UserEditScreen = ({ history,match }) => {
  
    const userId = match.params.id;

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [isAdmin,setIsAdmin] = useState(false);

    const dispatch = useDispatch();

    const userDetails = useSelector(state => state.userDetails);

    const { error, loading, user } = userDetails;

    const userUpdate = useSelector(state => state.userUpdate);
    const {error:errorUpdate, loading:loadingUpdate, success:successUpdate} = userUpdate;


    useEffect(() => {
      
      if(successUpdate){
        dispatch({type:USER_UPDATE_RESET})
        history.push('/admin/userlist')
      } else {

        if(!user.name || user._id !== Number(userId)){
          dispatch(getUserDetails(userId));
        }else{
          setName(user.name);
          setEmail(user.email);
          setIsAdmin(user.isAdmin);
        }

      }
    },[user, userId, dispatch, history, successUpdate]);

    const submitHandler = (e) =>{
      e.preventDefault();
      dispatch(updateUser({_id:user._id,name, email,isAdmin}))
    }


    return ( 
        <div>
          <Link to='/admin/userlist'>
            Go Back
          </Link>
            <FormContainer>
            <h2>Edit User</h2>
            {loadingUpdate && <Loader/>}
            {errorUpdate && <Message varaint="danger">{errorUpdate}</Message>}
              {loading ? <Loader/> : error ? <Message varaint="danger">{error}</Message>
              : (
                <Form onSubmit={submitHandler}>
                <Form.Group controlId = "name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control 
                        type='name' 
                        placeholder='Enter Name'
                        value = {name}
                        onChange = {(e)=>setName(e.target.value)}
                        >
    
                        </Form.Control>
                </Form.Group>
    
                <Form.Group controlId = "email">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control 
                       
                        type='email' 
                        placeholder='Enter Email'
                        value = {email}
                        onChange = {(e)=>setEmail(e.target.value)}
                        >
    
                        </Form.Control>
                </Form.Group>
    
    
    
                <Form.Group controlId = "isadmin">
                        <Form.Check 
                      
                        type='checkbox' 
                        label='Is Admin'
                        checked = {isAdmin}
                        onChange = {(e)=>setIsAdmin(e.target.checked)}
                        >
    
                        </Form.Check>
                </Form.Group>
    
                <Button type="submit" variant="primary">Update</Button>
                </Form>
              )}
            </FormContainer>

        </div>
     );
}
 
export default UserEditScreen;