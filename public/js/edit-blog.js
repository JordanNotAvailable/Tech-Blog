async function editFormHandler(event){

    event.preventDefault();

    console.log('Edit blog')
    
    const title = document.querySelector('input[name="blog-title"]')?.value;
    const content = document.querySelector('textarea[name="blog-content"]')?.value;
    const id = document.querySelector('input[name="blog-id"]')?.value;

    const response = await fetch(`/api/blogs/${id}`, {
        method: 'PUT', // or PATCH
        body: JSON.stringify({
            title,
            content
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok){
        document.location.replace('/dashboard/');
    }else {
        alert(response.statusText);
    }
}

document.querySelector('.edit-blog-form').addEventListener('submit', editFormHandler);