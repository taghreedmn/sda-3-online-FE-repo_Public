import React from 'react'
import UserItem from './UserItem';
import axios from 'axios';

export default function UserDashBoard() {
    const [userList, setUSerList] = useState([]);

    function fetchUserList() {
        const token = localStorage.getItem("token");
        axios.get("http://localhost:5125/api/v1/Customer", {
            header: {
                Authorization: `Bearer ${token}`,
            }
        }).then((res) => setUSerList(res.data))
            .catch((error) => console.log(error));
    }

    useEffect(() => {
        fetchUserList();
    }, []);
    console.log(userList)

    return (
        <div>
            {userList.map((user) => {
                return (
                    <UserItem key={user.id} user={user} fetchUserList={fetchUserList} />
                );
            })}
        </div>
    )
}
