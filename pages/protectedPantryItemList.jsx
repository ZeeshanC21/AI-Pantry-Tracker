
import withAuth from '../hoc/withAuth';
import PantryItemList from './PantryItemList';

const ProtectedPantryItemList = withAuth(PantryItemList);

export default ProtectedPantryItemList;
