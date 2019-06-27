# Scheduler App

This basic appointment (termed "Events") scheduling app supports two different types of users:
- Client
- Staff

## Client Workflow

1. Client registration/sign in 
2. Click on profile icon and navigate to "View Schedule"
3. Change view to staff calendar with whom they want to book an appointment
4. Click anywhere on calendar aside from existing Events to create new Event
5. Fill in required fields and "Submit"
6. Event is now "pending" status
7. Client can change view back to "My Calendar" to see all pending and confirmed Events.

## Staff Workflow

1. Staff sign in
2. Click on profile icon and navigate to "View Schedule"
3. Calendar displays all Events "pending" and "confirmed"
4. Click on pending Event
5. Change status to "confirmed" and "Submit"
6. Event is now "confirmed" in Client and Staff calendar

## Common Workflow
1. Log in
2. Click on profile icon and navigate to "View Profile"
3. Update profile related information and "Submit"
4. Click on profile icon and "Sign out"

## TODO
- Unit Test
- Staff notification for new pending Events
- Client notification for new confirmed Events
- Staff create/modify event in own calendar with Client selection field in Event dialog
- User profile image upload (AWS, S3 bucket)