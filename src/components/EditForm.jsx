function EditForm({ product }) {
    return (
        <form className="edit-form">
            <input type="text" defaultValue={product.name} />
            <input type="text" defaultValue={product.origin} />
            <input type="number" defaultValue={product.price} />
            <textarea defaultValue={product.description}></textarea>
            <button type="submit">Save</button>
        </form>
    );
}

export default EditForm;