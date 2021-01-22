use crate::models::user::User;

pub async fn seed_data() {
	let mut bob = User::new("Bob", "Matthews", "bob.matthews@email.com", "password");
	let mut john = User::new("John", "Austin", "john.ausin@email.com", "password");
	let mut kate = User::new("Kate", "Simpson", "kate.simpson@email.com", "password");
	let mut mark = User::new("Mark", "Blair", "mark.blair@email.com", "password");

	bob.create().await;
	john.create().await;
	kate.create().await;
	mark.create().await;

}
