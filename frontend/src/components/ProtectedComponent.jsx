import Header from "./Header/Header";
import Main from "./Main/Main";

export default function ProtectedComponent({dataUser, ...props}) {
  return (
    <>
      <Header dataUser={dataUser} />
      <Main
        name='main'
        {...props}
      />
    </>
  )
}