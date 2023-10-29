import './dist/output.css';
import MainContent from './MainContent';
import { useState } from 'react';
function App() {

  const [copyrightWasShown, setCopyRight]  = useState(false);

  const showCopyRightOnMobile = () => {
    // Popoup
    setCopyRight(true);

    const content = document.createElement('div');
    content.innerHTML = `
    <div class="fixed z-50 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

        
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                  Disclaimer
                </h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    This application has been developed for research purposes.
                    Data entered will be recorded and used to improve the prediction model.
                  </p>
                  <p class="text-sm text-gray-500">
                    &copy; 2023 ${["Tarek Alakmeh", "Amos Calamida", "Joel Rüttimann"].sort(() => Math.random() - 0.5).join(', ')}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button id="close-modal" type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-slate-500 text-base font-medium text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 sm:ml-3 sm:w-auto sm:text-sm">
              Close
            </button>
          </div>
        </div>
      </div>`;
    document.body.appendChild(content);
    const closeButton = document.getElementById('close-modal');
    closeButton.addEventListener('click', () => {
      document.body.removeChild(content);
    });

  }


  return (
    <div className='bg-sand-500'>
      <p className='py-2 px-4 hidden md:block md:text-right text-center border-b border-b-slate-600 text-sm font-medium'>
        Essentials in Natural Language Processing | Fall Semester 2023
      </p>
      <div className='flex'>
        <div className='hidden sm:flex flex-col border-r border-r-slate-600 w-56 justify-between' style={{ height: "calc(100vh - 2.5rem)" }}>
          <img src='https://www.uzh.ch/docroot/logos/uzh_logo_e_pos.svg' alt='UZH Logo' className='w-full h-24 p-6 border-b-slate-600 border-b' />
          <div className='p-6'>
            <p className='text-sm'>This application has been developed for research purposes.
              Data entered will be recorded and used to improve the prediction model.</p>
            <small>&copy; 2023 {["Tarek Alakmeh", "Amos Calamida", "Joel Rüttimann"].sort(() => Math.random() - 0.5).join(', ')}</small>
          </div>
        </div>
        <div className='flex-auto flex-col flex w-full '>
          <div className='border-b-slate-600 border-b p-4  h-24 flex justify-between items-center'>
            <img src='https://www.uzh.ch/docroot/logos/uzh_logo_e_pos.svg' alt='UZH Logo' className='h-10 visible md:hidden' />
            <p className='text-xl md:text-2xl font-medium flex flex-row gap-1'>Swiss German Dialects
              <button onClick={showCopyRightOnMobile} className='inline md:hidden p-0 text-black rounded-full'>
                
                <span class="relative flex h-4 w-4">
                  <span className="absolute animate-ping inline-flex h-full w-full rounded-full bg-slate-400 opacity-75"></span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="relative inline-flex h-4 w-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                </svg>
                </span>
              </button>
            </p>


          </div>
          <div className='flex p-6 place-items-center w-full'>
            <MainContent />
          </div>
        </div>
      </div>
    </div>
  );
}


export default App;
