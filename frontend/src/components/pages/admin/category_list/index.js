import React, {useState} from 'react';
import {toast} from 'react-toastify';
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useAllCategoriesQuery
} from '../../../../redux/api/categoryApiSlice'
import CategoryForm from '../category_form';
import Modal from '../../../helpers/modal';
import AdminMenu from '../admin_menu';

const CategoryList = () => {
  const {data: categories, refetch} = useAllCategoriesQuery();
  console.log(categories);
  const [name, setName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [updatingName, setUpdatingName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const handleCreateCategory = async(e) => {
     e.preventDefault();
     if(!name){
        toast.error('Category name is required')
        return 
     }
     try{
       const result = await createCategory({name}).unwrap();
       if(result.error){
          toast.error(result.error);
       }
       else{
          setName("");
          toast.success(`${result.name} is created`);
          refetch()
       }
     }
     catch(error){
       console.error(error);
       toast.error('Creating category failed, try again')
     }
  }

  const handleUpdateCategory = async(e) => {
     e.preventDefault();
     if(!updatingName){
        toast.error('Category name is required');
        return;
     }
     try{
       const result = await updateCategory(
          {
            categoryId: selectedCategory._id,
            name: updatingName
          }
      ).unwrap()
      if(result.error){
        toast.error(result.error)
      }
      else{
        toast.success(`${result.name} is updated`);
        setSelectedCategory(null);
        setUpdatingName('');
        setModalVisible(false);
        refetch()
      }
     }
     catch(err){
       console.error(err)
     }
  }

  const handleDeleteCategory = async() => {
    try{
      const result  = await deleteCategory(selectedCategory._id).unwrap();
      if(result.error){
        toast.error(result.error)
      }
      else{
        toast.success(`${result.name} is deleted.`);
        setSelectedCategory(null);
        setModalVisible(false);
        refetch()
      }
    }
    catch(error){
       console.error(error)
       toast.error('Category deletion failed. Tray again.')
    }
  }

  return (
    <div className='ml-[10rem] flex flex-col md:flex-row'>
         <AdminMenu/>
         <div className='md: w-3/4 p-3'>
            <div className='h-12 font-semibold text-2xl ml-2'>Category <span className='text-[#1DB954]'>List.</span></div>
            <CategoryForm 
              value={name}
              setValue={setName}
              handleSubmit={handleCreateCategory}
            />
            <br/>
            <hr/>
            <div className='flex flex-wrap'>
                {
                  categories?.map((category) => (
                    <div key={category._id}>
                       <button 
                        className='bg-white text-pink-600 font-extrabold py-2 px-4 rounded-lg m-3 hover:bg-pink-600 
                        hover:text-white focus:outline-none focus:ring-2 focus:ring-pink-600 focus:ring-opacity-50'
                         onClick={() => {
                          {
                            setModalVisible(true)
                            setSelectedCategory(category)
                            setUpdatingName(category.name)
                          }
                         }}
                        >
                           {category.name}
                        </button>
                    </div>
                  ))
                }
            </div>
             <Modal
               isOpen={modalVisible}
               onClose={() => setModalVisible(false)}
             >
                <CategoryForm 
                  value={updatingName}
                  setValue={value => setUpdatingName(value)}
                  handleSubmit={handleUpdateCategory}
                  buttonText = 'Update'
                  handleDelete={handleDeleteCategory}
                />
             </Modal>
         </div>
    </div>
  )
}

export default CategoryList