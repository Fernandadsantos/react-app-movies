import { AppBar, Breadcrumbs } from "@material-ui/core";
import Link from '@material-ui/core/Link';
import { signOut } from "firebase/auth";
import SearchBar from "../search";
import './header.scss';
import { auth } from "../../api/firebase";

interface headerProps {
    title?: string;
    onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
    children?: React.ReactNode;
    username?: string | null;
}

function Header({ title, onChange, children, username }: headerProps) {
    

    async function logOut() {
        try {
            await signOut(auth)
        }
        catch (error: any) {
            console.log(error)
        }
    }
    return (
        <header>
            <AppBar className='hearder-guia' >

                <div className='header'>
                    <div className="headerItens">
                        <button className="btnLogOut" onClick={logOut}>
                            Sair
                        </button>
                        {
                            children ?? <Breadcrumbs >
                                <Link underline='none' href='/' >
                                    <div className="textHeader">
                                          <span className='header-title'>{title}</span>
                                          <span className="header-userName">{username}</span>
                                    </div>
                                  
                                    
                                </Link>
                            </Breadcrumbs>
                        }
                        
                    </div>
                    <SearchBar onChange={onChange} />
                </div>
            </AppBar>
        </header>
    )
}

export default Header;