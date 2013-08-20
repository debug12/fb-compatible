exports.ID = '476784319062992';
exports.secret = 'cf175ce95c7078ea2abdd688fddab92d'
exports.scope = 'email, user_birthday';
exports.redirect = "http://localhost:3000/auth/facebook/callback";
exports.permissions = ['email', 'read_stream', 'user_groups', 'user_relationships', 'user_hometown', 'user_location', 'user_religion_politics','user_likes', 'user_about_me', 'user_birthday','user_events', 'user_interests','friends_likes', 'friends_events', 'user_relationship_details', 'publish_actions', 'user_education_history'];
exports.query = '?fields=id,name,hometown,birthday,age_range,interested_in,education,location,relationship_status,gender,likes.limit(50).fields(id),events.until(1376697600).limit(50).fields(id)';