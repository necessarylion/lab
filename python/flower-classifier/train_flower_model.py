from datasets import load_dataset
from transformers import (
    AutoImageProcessor,
    AutoModelForImageClassification,
    TrainingArguments,
    Trainer
)
import torch
import numpy as np

print("Loading Oxford Flowers dataset...")
# Load dataset (102 flower categories)
dataset = load_dataset("nelorth/oxford-flowers")

print(f"Train samples: {len(dataset['train'])}")
print(f"Test samples: {len(dataset['test'])}")

# Load image processor
model_name = "microsoft/resnet-50"
processor = AutoImageProcessor.from_pretrained(model_name)

# Define image transformations
def transform_images(examples):
    """Preprocess images"""
    images = [img.convert("RGB") for img in examples['image']]
    inputs = processor(images, return_tensors="pt")
    inputs['labels'] = examples['label']
    return inputs

# Apply transformations
print("Preprocessing images...")
train_dataset = dataset['train'].map(transform_images, batched=True, remove_columns=['image', 'label'])
test_dataset = dataset['test'].map(transform_images, batched=True, remove_columns=['image', 'label'])

# Set format for PyTorch
train_dataset.set_format('torch')
test_dataset.set_format('torch')

# Load model
print("Loading model...")
model = AutoModelForImageClassification.from_pretrained(
    model_name,
    num_labels=102,  # 102 flower species
    ignore_mismatched_sizes=True
)

# Evaluation metric
def compute_metrics(eval_pred):
    predictions, labels = eval_pred
    predictions = np.argmax(predictions, axis=1)
    accuracy = (predictions == labels).mean()
    return {"accuracy": accuracy}

# Training arguments
training_args = TrainingArguments(
    output_dir="./flower-model",
    eval_strategy="epoch",
    save_strategy="epoch",
    learning_rate=2e-5,
    per_device_train_batch_size=32,  # Reduce if out of memory
    per_device_eval_batch_size=32,
    num_train_epochs=5,
    weight_decay=0.01,
    load_best_model_at_end=True,
    metric_for_best_model="accuracy",
    logging_dir='./logs',
    logging_steps=10,
    remove_unused_columns=False,
)

# Create trainer
trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=train_dataset,
    eval_dataset=test_dataset,
    compute_metrics=compute_metrics,
    data_collator=lambda data: {
        'pixel_values': torch.stack([f['pixel_values'] for f in data]),
        'labels': torch.tensor([f['labels'] for f in data])
    }
)

# Train
print("Starting training...")
trainer.train()

# Save final model
print("Saving model...")
model.save_pretrained("./flower-model-final")
processor.save_pretrained("./flower-model-final")

print("Training complete!")

# Test the model
print("\nTesting model...")
results = trainer.evaluate()
print(f"Test Accuracy: {results['eval_accuracy']:.2%}")