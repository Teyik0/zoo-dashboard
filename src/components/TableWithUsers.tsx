/* eslint-disable @next/next/no-img-element */

const TableWithUsers = () => {
  return (
    <div className='p-4 rounded-xl'>
      <div className='shadow-md rounded-lg'>
        <table className='w-full text-sm text-left text-gray-500 rounded-xl'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50 border rounded-xl'>
            <tr className='rounded-xl'>
              <th scope='col' className='px-6 py-3 rounded-xl'>
                Name
              </th>
              <th scope='col' className='px-6 py-3'>
                Position
              </th>
              <th scope='col' className='px-6 py-3'>
                Status
              </th>
              <th scope='col' className='px-6 py-3'>
                Action
              </th>
            </tr>
          </thead>
          <tbody className='rounded-xl'>
            <tr className='rounded-xl bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
              <th
                scope='row'
                className='flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white'
              >
                <div className='pl-3'>
                  <div className='text-base font-semibold'>Neil Sims</div>
                  <div className='font-normal text-gray-500'>
                    neil.sims@flowbite.com
                  </div>
                </div>
              </th>
              <td className='px-6 py-4'>React Developer</td>
              <td className='px-6 py-4'>
                <div className='flex items-center'>
                  <div className='h-2.5 w-2.5 rounded-full bg-green-500 mr-2'></div>{' '}
                  Online
                </div>
              </td>
              <td className='px-6 py-4'>
                <a
                  href='#'
                  className='font-medium text-blue-600 dark:text-blue-500 hover:underline'
                >
                  Edit user
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableWithUsers;
