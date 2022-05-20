import "./authentication.css";
import { useAuth } from "../../contexts/authentication.context";
import ProfileDataPanel from "./components/profileDataPanel.cmpt";
import ProfilePasswordPanel from "./components/profilePasswordPanel.cmpt";
import ProfileSettingsPanel from "./components/profileSettingsPanel.cmpt";
import { FC, useState } from "react";


const ProfilePage: FC = () => {

    enum Panel {
        account = "account",
        password = "password",
        settings = "settings"
    };

    const [panel, SetPanel] = useState<Panel>(Panel.account)

    const SwitchPanel = () => {
        switch(panel) {
          case Panel.account:
            return <ProfileDataPanel />;
          case Panel.password:
              return <ProfilePasswordPanel />;
          case Panel.settings:
              return <ProfileSettingsPanel />;
          default:
            return null;
        }
    };

    const activeStyle = (thisPanel: Panel) => {
        if (panel === thisPanel) {
            return {
                opacity: 1.0,
                textDecoration: "underline"
            }
        };
        return {};
    };

    return (
        <div className="auth-root-container">
            <div className="profile-root-container">
                <div className="profile-menu-container">
                    <label style={activeStyle(Panel.account)} className="noselect" onClick={() => SetPanel(Panel.account)}>Account</label>
                    <label style={activeStyle(Panel.password)} className="noselect" onClick={() => SetPanel(Panel.password)}>Password</label>
                    <label style={activeStyle(Panel.settings)} className="noselect" onClick={() => SetPanel(Panel.settings)}>Settings</label>
                </div>
                <div>
                    <SwitchPanel />
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;