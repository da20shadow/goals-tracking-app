export class GlobalClasses {

  //TODO: move inputs in formClasses class

  /** -------------Inputs------------- */
  static readonly input = ' bg-gray-100 text-neutral-800 placeholder:text-slate-400 ' +
    'dark:bg-slate-900 dark:text-neutral-300 dark:placeholder:text-slate-600 ' +
    'w-full text-sm border-none outline-none py-3 pr-4 pl-2 rounded-r ';

  static readonly inputIcon = 'bg-gray-100 text-neutral-800 ' +
    'dark:bg-slate-900 dark:text-slate-600 pt-2 pr-2 pl-3 rounded-l ';


  /** ------------- Buttons ------------- */


  /** ------------- Links ------------- */


  /** ------------- Icons ------------- */
  static readonly icon = `mr-2 p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white`;

  /** ------------- Navigations Menus ------------- */
  static readonly header = `bg-gray-100 dark:bg-gray-800 relative w-full flex flex-wrap items-center justify-between
  py-4 px-5 shadow-lg`;

  static readonly nav = `flex flex-wrap justify-center gap-4 items-center`
  static readonly navLink = `hover:bg-gray-200 active:bg-gray-300
  dark:hover:bg-gray-700 dark:active:bg-gray-600 text-gray-500 hover:text-gray-700 focus:text-gray-600
  dark:text-gray-500 dark:hover:text-gray-300 py-2 px-3 cursor-pointer rounded`;

  static readonly link = 'font-medium text-blue-600 hover:text-blue-700 hover:underline';
  // static readonly navLink = 'text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium';


  /** ----------Tables style---------- */
  static readonly tableBodyRow = `text-center border border-transparent dark:hover:border-gray-600 dark:hover:text-[#f0f8ff] dark:bg-[#252f3f] dark:hover:bg-gray-900 dark:odd:bg-gray-800`;
  static readonly tableBodyRowData = `py-3 whitespace-nowrap dark:hover:bg-[#4b5563] max-w-[75px] border-l dark:border-gray-600 cursor-pointer`;


  static readonly bgDarkSecBlue = 'dark:bg-[#162231]';
}
