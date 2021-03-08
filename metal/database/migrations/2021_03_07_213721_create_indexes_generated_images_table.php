<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateIndexesGeneratedImagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('indexes_generated_images', function (Blueprint $table) {
            $table->id();
            $table->string('url')->unique()->index();
            $table->foreignId('index_image_id')->constrained('indexes_images');
            $table->foreignId('product_id')->constrained('products');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('indexes_generated_images');
    }
}
