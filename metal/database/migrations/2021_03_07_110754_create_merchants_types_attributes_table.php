<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMerchantsTypesAttributesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('merchants_types_attributes', function (Blueprint $table) {
            $table->id();
            $table->decimal('price', 8, 2)->nullable();
            $table->foreignId('merchant_id')->constrained('merchants');
            $table->foreignId('type_attribute_id')->constrained('types_attributes');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('merchants_types_attributes');
    }
}
