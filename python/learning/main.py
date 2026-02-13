from datasets import Dataset

# Create a simple dataset
data = {
    'text': ['hello world', 'machine learning', 'deep learning'],
    'score': [1, 2, 3],
    'category': ['A', 'B', 'C']
}
dataset = Dataset.from_dict(data)

print("Original dataset:")
print(dataset)
print(dataset[0])

# Apply transformation
processed = dataset.map(
    lambda examples: {
        'text_upper': [text.upper() for text in examples['text']],
		'word_count': [len(text.split()) for text in examples['text']]
	}, 
    batched=True,  # Process multiple examples at once
    remove_columns=['text', 'category']  # Remove these after processing
)

print("\nProcessed dataset:")
print(processed)
print(processed[0])
print(processed[1])
