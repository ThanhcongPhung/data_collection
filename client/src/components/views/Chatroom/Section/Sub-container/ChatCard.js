import React from 'react';
import moment from 'moment';
import { Comment, Tooltip, Avatar } from 'antd';

export default function ChatCard(props){
  return (
      <div style={{width:'100%',marginLeft:'20px'}}>
        <Comment
            author={props.sender.name}
            avatar={
              <Avatar
                  src={props.sender.image} alt={props.sender.name}
              />
            }
            content={
                  <p>
                    {props.message}
                  </p>
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
