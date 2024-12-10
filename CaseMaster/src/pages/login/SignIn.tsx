import { useNavigate } from "react-router-dom";
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';

const SignIn = () => {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate("/profile-setup");
  };

  return (
    <div className='flex items-center justify-center min-h-screen'>
    <div className="flex items-center justify-center flex-col text-center">
         <BusinessCenterOutlinedIcon style={{fontSize:'60px', color:'#0f2043'}}/>
      <p className='text-[6rem] font-bold text-[#0f2043]'>CaseMaster</p>
      <p className='text-4xl text-[#0f2043]'>Your go-to Legal Workflow Manager </p>
      <p className='text-xl text-[rgba(15,32,67,0.3)] my-7'>Putting ease in all your legal workflow—all at one</p>
      <button onClick={handleSignIn} className='bg-[#0f2043] w-64 h-10 rounded-xl text-white'>
        Sign In With <strong>Microsoft</strong>   
    </button>
    </div>
    </div>
  );
};

export default SignIn;
