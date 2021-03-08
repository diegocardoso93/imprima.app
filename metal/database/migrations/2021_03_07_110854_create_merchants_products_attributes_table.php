<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMerchantsProductsAttributesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('merchants_products_attributes', function (Blueprint $table) {
            $table->id();
            $table->decimal('price', 8, 2)->nullable();
            $table->foreignId('merchant_id')->constrained('merchants');
            $table->foreignId('product_attribute_id')->constrained('products_attributes');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('merchants_products_attributes');
    }
}
