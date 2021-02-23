import React from 'react';
import moment from 'moment';
import { Comment, Tooltip, Avatar } from 'antd';

export default function ChatCard(props){
  return (
      <div style={{width:'100%',marginLeft:'20px'}}>
        <Comment
            author={props.user.name}
            avatar={
              <Avatar
                  src={props.user.image} alt={props.user.name}
              />
            }
            content={
              <audio
                  src={props.link} alt="audio"
                  type="audio/wav" controls
              />
            }
            datetime={
              <Tooltip title={moment(props.createdAt).format('YYYY-MM-DD HH:mm:ss')}>
                <span>{moment(props.createdAt).fromNow()}</span>
              </Tooltip>
            }
        />
      </div>
  )
}
