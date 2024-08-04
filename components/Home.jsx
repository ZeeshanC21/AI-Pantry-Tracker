// import AddPantryItem from "@/components/AddPantryItem";
// import PantryItemList from "@/components/PantryItemList";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Content from "./Content";
import Nav from "./Nav";




const Home = () => {
  return (
    <div style={{backgroundColor:'#F8F8FF',display:'flex',flexDirection:'column',height:'100vh'}}>
        <Nav />
        <Content />
    </div>
  )
}

export default Home