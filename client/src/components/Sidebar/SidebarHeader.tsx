import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

export const SidebarHeader = () => {

    const { auth, logout } = useContext( AuthContext );

    return (

        <div className="row sidebar-heading">
            <div className="col-sm-2 col-xs-2 ">
                <div className="heading-avatar-icon">
                    <img
                        src={auth.avatar}
                        alt=""
                    />
                </div>
            </div>
            <div className="col-sm-9 col-xs-9 sidebar-heading-name">
                <h4>{ auth.firstName } { auth.lastName }</h4>
            </div>
            <div className="col-sm-1 col-xs-1 sidebar-heading-logout">
            <i
                className="fas fa-sign-out-alt"
                aria-hidden="true"
                onClick={ logout }
                title="Logout"
            />
            </div>
        </div>
    

    );
}