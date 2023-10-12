import './dist/output.css';

function App() {
  return (
    <div className='bg-sand-500'>
      <p className='py-2 px-4 md:text-right text-center border-b border-b-slate-600 text-sm font-medium'>
        Essentials in Natural Language Processing | Fall Semester 2023
      </p>
      <div className='flex'>
        <div className='flex-col flex border-r border-r-slate-600 w-56 justify-between h-screen'>
          <img src='https://www.uzh.ch/docroot/logos/uzh_logo_e_pos.svg' alt='UZH Logo' className='w-full h-24 p-6 border-b-slate-600 border-b' />
          <div className='flex p-6'>
            <p className='text-sm'>This application has been developed for research purposes.
              Data entered will be recorded and used to improve the prediction model.</p>
          </div>
        </div>
        <div className='flex-auto flex-col flex w-full '>
          <div className='border-b-slate-600 border-b p-4  h-24 flex items-center '>
            <p className='text-xl font-medium '>Swiss German Dialects</p>
          </div>
          <div className='flex p-6 place-items-center w-full'>
            <MainContent />
          </div>
        </div>
      </div>
    </div>
  );
}

function MainContent() {
  return (
    <div className="bg-gray-800 text-white p-4">
      Main Content
    </div>
  );
}

export default App;
