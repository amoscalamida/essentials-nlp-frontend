import './dist/output.css';
import MainContent from './MainContent';

function App() {
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
            <p className='text-xl md:text-2xl font-medium'>Swiss German Dialects</p>
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
