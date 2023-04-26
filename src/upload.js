import { useState , useEffect } from 'react';
import { ref , uploadBytes , getDownloadURL } from 'firebase/storage';
import { storage } from './firebase';
import { useLocation , Link } from 'react-router-dom';
import Axios from 'axios';
import React from 'react';
//import { v4 } from 'uuid';

import NavBar from './Navbar';

import './Login.css';

function Upload(){

	const [File , setFile] = useState(null);
	const [FileUrls , setFileUrls] = useState([]);
	const [ Loader , setLoader ] = useState(false);
	const [TempFile , setTempFile] = useState(null);
	const [FileUrls , setFileUrls] = useState([]);

	const [ Stabilize , setStabilize ] = useState(null);
	const [ Punch , setPunch ] = useState(null);

	const Location = useLocation();

	const verify = () =>{
		if(File === null){
			alert("No File Uploaded")
		}
		else{
			run()
		}
	}

	const run = () =>{
		if( Punch!=null && Stabilize!= null){
			alert("Printing Stabilized and Punched Pages!");
		}
		else if(Punch!=null){
			alert("Printing Punched Pages!");
		}
		else if(Stabilize!=null){
			alert("Printing Stabilized Pages!");
		}
		else{
			alert("Printing Standard Pages!");
		}

	}

	const Delete = (file) => {
		setLoader(true);
		for(var i=0;i<FileUrls.length;i++){
			if(FileUrls[i].url === file){
				FileUrls.splice(i,1);
			}
		}
		Axios.put("http://localhost:3001/deleteMe" , {id:Location.state.id , file : FileUrls}).then(()=>{
			alert("Deleted")
			setLoader(false);
		});
	};


	const upload = () => {
		setLoader(true);
		if (File == null) return;
		const FileRef = ref(storage , `${Location.state.name}/${File.name}`);
		uploadBytes(FileRef , File).then((FileData) => {
			getDownloadURL(FileData.ref).then((url) => {
				Axios.put("http://localhost:3001/addFile" , {user: Location.state.user , id:Location.state.id , file : url , file_name : FileData.ref.name}).then(() => {
					Axios.put("http://localhost:3001/getUsers" , {id : Location.state.id}).then((response)=>{
						setFileUrls(response.data.Files);
						setLoader(false);
					});	
				})
			});
		});
	};
	
	const uploadTemp =(FileTemp)=>{
		setLoader(true);
		if (FileTemp == null) {setLoader(false);return;}
		const FileRef = ref(storage , `Temp/${FileTemp.name}`);
		uploadBytes(FileRef , FileTemp).then((FileData) => {
			getDownloadURL(FileData.ref).then((url) => {
				setTempFile(url);
				setLoader(false);
			});
		});
	}


	useEffect(
		() =>{
			if(Location.state !== null){
				setLoader(true);
				Axios.put("http://localhost:3001/getUsers" , {id : Location.state.id}).then((response)=>{
					setFileUrls(response.data.Files);
					setLoader(false);
				})
			}
		// eslint-disable-next-line react-hooks/exhaustive-deps
		} , []
	);

	return(
		<>
			{
				(Loader)?<div class="loader"></div>:
				<>
					{
						(Location.state === null)?<NavBar Received={null}/>:
						<NavBar Received={ {name : Location.state.name , status: Location.state.status , user:Location.state.user , type:Location.state.type , id:Location.state.id} } />
					}
					{
						(Location.state === null)?
						<>
							<div className='overall'>
								<div className='main-container-Main'>
									<div className='container'>
										<div className="container sub-container-1 float-start">
											<p className="label-log-attributes">
												UPLOAD YOUR FILE:
											</p>
											<br></br>
											<input type="file" placeholder="Any Thing..." className='input-log-attributes w-100'
											onChange={(e) => {uploadTemp(e.target.files[0]);}}></input>
											{
												(TempFile!=null)?<>
												<embed ref={Cref} src={`${TempFile}#toolbar=1&navpanes=0&scrollbar=0`} className='pdf'/>
												<input type="checkbox" className='files-checkbox' onChange={(e)=>{setStabilize(e.target.value)}} value="Stabilize" /><p className='files-p-tag others'>Stabilize</p>
											<input type="checkbox" className='files-checkbox' onChange={(e)=>{setPunch(e.target.value)}} value="Punch Hole" /><p className='files-p-tag others'>Punch Hole</p>
												</>:<></>
											}
										</div>
									</div>
									<div className="clear"></div>
								</div>
								</div>
						</>
						:
						<>
							{(FileUrls === [])?
							<>
								<div className='overall'>
								<div className='main-container-Main'>
									<div className='container'>
										<div className="container sub-container-1 float-start">
											<p className="label-log-attributes">
												UPLOAD YOUR FILE:
											</p>
											<br></br>
											<input type="file" placeholder="Any Thing..." className='input-log-attributes w-100'
											onChange={(e) => {setFile(e.target.files[0])}}></input>
											<button className='general-button final-button col-12' onClick={upload}>UPLOAD
											<i class="fi fi-rr-upload end-icons"></i></button>
										</div>
									</div>
									<div className="clear"></div>
								</div>
								</div>
								<p className='files-label'>No Files Yet</p>
							</>
							:
							<div className='overall'>
								<div className='main-container-Main w-100'>
									<div className='container'>
										<div className="container sub-container-1 float-start">
											<p className="label-log-attributes">
												UPLOAD YOUR FILE:
											</p>
											<br></br>
											<input type="file" placeholder="Any Thing..." className='input-log-attributes w-100'
											onChange={(e) => {setFile(e.target.files[0])}}></input>
											<button className='general-button final-button col-12' onClick={upload}>UPLOAD
											<i class="fi fi-rr-upload end-icons"></i></button>
										</div>
									</div>
									<div className="clear"></div>
								</div>
								<div className='bas'>
								<p className='files-label1'>YOUR FILES</p>
								<div>
								{
									FileUrls.map((url) => {
									return (
										<div className='container-fluid w-100'>
											<div className='container w-75 title'>
												<p className='files-p-tag name'>{url.name}</p>
											</div>
											<div className='container w-50 options'>
												<a className='files-a-tag-view' target="blank" href={`${url.url}#toolbar=0`} ><p className='files-p-tag'>VIEW</p>
												<i class="fi fi-bs-eye end-icons"></i></a>
												<Link className='files-a-tag-print' target="_blank" to="/View" onClick={()=>{run()}}><p className='files-p-tag'>PRINT</p>
												<i class="fi fi-rr-print end-icons"></i></Link><br className='br'/>
												<input type="checkbox" className='files-checkbox' onChange={(e)=>{setStabilize(e.target.value)}} value="Stabilize" /><p className='files-p-tag others'>Stabilize</p>
												<input type="checkbox" className='files-checkbox' onChange={(e)=>{setPunch(e.target.value)}} value="Punch Hole" /><p className='files-p-tag others'>Punch Hole</p>
												<button className='general-button delete' onClick={() => {
													Delete(url.url)
												}}><i class="fi fi-rr-trash"></i></button>
											</div>
											<br/>
											<br/>
										</div> 
										);
									})
								}
								</div>
								</div>
							</div>
							}
						</>
					}
				</>
			}
		</>
		);

}

export default Upload
