import {Card, Icon, Image} from "semantic-ui-react";
import React from "react";
import {Link} from "react-router-dom";

export const FollCard = (props) => {
    const {
        name,
        followersCount,
        followingDate,
        avatar
    } = props;

    return (
        <Card>
            <Image src={avatar}/>
            <Card.Content>
                <Card.Header textAlign='center'>
                    <Link to={'/' + name}>{name}</Link>
                </Card.Header>
                <Card.Meta textAlign='center'>
                    <span className='date'>
                        Joined in {new Date(followingDate*1000).getFullYear()}
                        </span>
                </Card.Meta>
            </Card.Content>
            <Card.Content extra>
                <Link to={'/' + name + '/followers'}>
                    <Icon name='user'/>
                    {followersCount} Followers
                </Link>
            </Card.Content>
        </Card>
    );
};
