use crate::errors::AppError;
use awmp::File;
use std::fs;

pub fn save_image(image_file: File, image_key: &str) -> Result<(), AppError> {
	fs::create_dir_all("images")?;
	let file_path = format!("images/{}", image_key);
	image_file.persist_at(&file_path)?;
	Ok(())
}

pub fn delete_image(image_key: &str) -> Result<(), AppError> {
	let file_path = format!("images/{}", image_key);
	fs::remove_file(&file_path)?;
	Ok(())
}

pub fn read_image(image_key: &str) -> Result<Vec<u8>, AppError> {
	let file_path = format!("images/{}", image_key);
	Ok(fs::read(&file_path)?)
}
