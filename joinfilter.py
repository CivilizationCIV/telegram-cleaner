import time
import datetime
from telethon import TelegramClient
from telethon.client import users
from telethon.tl.types import ChannelParticipantsRecent
from telethon.tl.functions.contacts import ResolveUsernameRequest
from telethon.tl.functions.channels import EditBannedRequest
from telethon.tl.types import ChatBannedRights

data = [
    "sessionname", # session name
    "x", # id
    "f", # hash
    "groupname", # target group name
    [], # gathered user ids
    1000 # limit of users to gather
]
client = TelegramClient(data[0], data[1], data[2])
client.session.report_errors = False

async def main():
    
    await client.connect()
    if not await client.is_user_authorized():
        client.send_code_request(data[0])
        client.sign_in(
            data[0],
            input('Enter code ')
        )
    
    group = await client(
        ResolveUsernameRequest(data[3])
    )

    async for user in client.iter_participants(
        group,
        filter=ChannelParticipantsRecent,
        limit=data[5]
    ):
        data[4].append(user.id)

    should_ban = False
    error_called = False
    counter = 0
    for id in data[4]:
        if id == 1074053309:
            should_ban = True

        if id == 1834600391:
            should_ban = False

        if should_ban == True:
            time.sleep(20)
            try:
                result = await client(EditBannedRequest(
                    channel=data[3],
                    participant=user,
                    banned_rights=ChatBannedRights(
                        until_date=datetime.timedelta(days=999),
                        view_messages=True,
                    )
                ))
                
                print("x")
            except:
                if error_called == False:
                    print("You must be admin")
                    error_called == True
                    return
            counter = counter+1
    
    print(counter)

    print("done!")

with client:
    client.loop.run_until_complete(main())
