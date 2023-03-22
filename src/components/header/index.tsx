import { AppBar, Breadcrumbs } from "@material-ui/core";
import Link from '@material-ui/core/Link';
import SearchBar from "../search";
import './header.scss';

interface headerProps {
    title?: string;
    onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
    children?: React.ReactNode;
}

function Header({ title, onChange, children }: headerProps) {

    return (
        <header>
            <AppBar className='hearder-guia' >
                <div className='header'>
                    {
                        children ?? <Breadcrumbs >
                            <Link underline='none' href='/' >
                                <span className='header-title'>{title}</span>
                            </Link>
                        </Breadcrumbs>
                    }

                    <SearchBar onChange={onChange} />
                </div>
            </AppBar>
        </header>
    )
}

export default Header;