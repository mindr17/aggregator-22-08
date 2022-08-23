import Footer from '../Footer/Footer';
import Header from '../Header/Header';

type Props = {
  children?: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className='layout'>
      <Header />
      <div className='main'>{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
